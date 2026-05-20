# ASCII Experiment: Noisy Pattern Recall
# This script compares classical and quantum Hopfield networks on noisy ASCII patterns.

import numpy as np
from termcolor import colored

# Define ASCII patterns
patterns = {
    "A": [
        "  ###  ",
        " #   # ",
        " ##### ",
        " #   # ",
        " #   # "
    ],
    "MOTHER": [
        "#     #  ###   ####  #   #  ##### ",
        "##   ## #   # #     #   #  #     ",
        "# # # # #####  ###  #####  ###   ",
        "#  #  # #   #     # #   #     #  ",
        "#     # #   # ####  #   # ####   "
    ]
}

# Convert ASCII to binary matrix
def ascii_to_binary(ascii_art):
    max_length = max(len(line) for line in ascii_art)
    padded_art = [line.ljust(max_length) for line in ascii_art]
    return np.array([[1 if char == "#" else 0 for char in line] for line in padded_art])

# Add noise to binary matrix
def add_noise(binary_matrix, noise_level=0.2):
    noisy = binary_matrix.copy()
    num_flips = int(noise_level * binary_matrix.size)
    indices = np.random.choice(binary_matrix.size, num_flips, replace=False)
    for idx in indices:
        i, j = divmod(idx, binary_matrix.shape[1])
        noisy[i, j] = 1 - noisy[i, j]  # Flip bit
    return noisy

# Convert binary matrix back to ASCII
def binary_to_ascii(binary_matrix):
    return ["".join("#" if bit else " " for bit in row) for row in binary_matrix]

# Display ASCII art with neon colors
def display_ascii(ascii_art, color):
    for line in ascii_art:
        print(colored(line, color))

# Example experiment
if __name__ == "__main__":
    # Select pattern
    pattern_name = "MOTHER"
    original = ascii_to_binary(patterns[pattern_name])

    # Add noise
    noisy = add_noise(original, noise_level=0.3)

    # Simulate recovery (placeholder for actual Hopfield models)
    classical_recovery = noisy  # Replace with classical Hopfield recovery
    quantum_recovery = original  # Replace with quantum Hopfield recovery

    # Display results
    print("Original Pattern:")
    display_ascii(binary_to_ascii(original), "blue")

    print("\nNoisy Pattern:")
    display_ascii(binary_to_ascii(noisy), "red")

    print("\nClassical Recovery:")
    display_ascii(binary_to_ascii(classical_recovery), "yellow")

    print("\nQuantum Recovery:")
    display_ascii(binary_to_ascii(quantum_recovery), "magenta")
