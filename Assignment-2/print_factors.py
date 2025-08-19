def print_factors(n):
    for i in range(1, n + 1):
        if n % i == 0:
            print(i)

# Example usage:
number = int(input("Enter a number: "))
print(f"Factors of {number} are:")
print_factors(number)
