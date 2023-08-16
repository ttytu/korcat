import os
import sys
import time
import pandas as pd
import logging
import torch
import argparse
from torch import nn, optim
from .config import *
from .models.build_model import build_model
from .data import Multi30k
from .utils import get_bleu_score, greedy_decode
from konlpy.tag import Mecab

mecab = Mecab()

DATASET = Multi30k()

def inference(src):
    src = mecab.morphs(src)
    src = " ".join(src)
    torch.manual_seed(0)

    resume_from = "/home/compu/korcat/backend/apps/files/morpheme/chk/1400.pt"

    # 불러오기
    model = build_model(len(DATASET.vocab_src), len(
        DATASET.vocab_tgt), device=DEVICE, dr_rate=DROPOUT_RATE)
    model.load_state_dict(torch.load(resume_from, map_location='cuda:0')["model_state_dict"])

    result = DATASET.translate(model, src, greedy_decode)
    result = result.replace("<sos>", "")
    result = result.replace("<unk>", "")
    result = result.replace("<eos>", "")

    before = result

    # 사용자 사전 적용
    user_dict = pd.read_csv(
        "/home/compu/korcat/backend/apps/files/morpheme/user_dic.csv", encoding="utf-8-sig")
    # 중복 제거
    user_dict = user_dict.drop_duplicates(subset="morp")

    src_split = src.split(" ")

    t = result.split(" ")
    morp_list = list()

    for idx, item in enumerate(t):
        try:
            tmp = ""
            if item == "/":
                tmp = t[idx-1]+" "+item+" "+t[idx+1]
                morp_list.append(tmp)
        except:
            continue

    for idx, item in enumerate(morp_list):
        try:
            if src_split[idx].strip() not in item:
                filtered_user_dict = user_dict[user_dict["morp"].str.strip() == src_split[idx].strip()]
                if not filtered_user_dict.empty:
                    replace = filtered_user_dict.iloc[0]["morp"] + " / " + filtered_user_dict.iloc[0]["label"]
                    morp_list[idx] = replace
        except:
            continue
    print(morp_list)
    return morp_list

def pos(src):
    return inference(src)

inference("요셉은 현대건설업체의 후원자이다.")