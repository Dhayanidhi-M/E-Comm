def fibonacci_recursive(n):
    if n <= 1:
        return n
    else:
        return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2)

def fibonacci_iterative(n):
    series = []
    a, b = 0, 1
    for _ in range(n):
        series.append(a)
        a, b = b, a + b
    return series

count = int(input("Enter the number of terms: "))

print("Fibonacci series using recursion:")
for i in range(count):
    print(fibonacci_recursive(i), end=" ")
print()

print("Fibonacci series without recursion:")
print(" ".join(str(num) for num in fibonacci_iterative(count)))
