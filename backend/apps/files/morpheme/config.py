import torch

DEVICE = torch.device('cuda:0')
CHECKPOINT_DIR = "./chk"

N_EPOCH = 5001

BATCH_SIZE = 48
NUM_WORKERS = 8

LEARNING_RATE = 1e-3
WEIGHT_DECAY = 5e-4
ADAM_EPS = 5e-9
SCHEDULER_FACTOR = 0.9
SCHEDULER_PATIENCE = 10

WARM_UP_STEP = 100

DROPOUT_RATE = 0.1