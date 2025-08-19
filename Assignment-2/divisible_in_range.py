start = int(input("Enter the start of the range: "))
end = int(input("Enter the end of the range: "))
divisor = int(input("Enter the divisor: "))

print(f"Numbers divisible by {divisor} in the range {start} to {end}:")
for num in range(start, end + 1):
    if num % divisor == 0:
        print(num)
