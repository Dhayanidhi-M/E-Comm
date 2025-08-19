import collections
import csv
import re

def extract_ip(line):
    # Extract the first part of the line (IP address)
    match = re.match(r'^(\d+\.\d+\.\d+\.\d+)', line)
    if match:
        return match.group(1)
    return None

def analyze_log(file_path):
    ip_counter = collections.Counter()
    with open(file_path, 'r') as f:
        for line in f:
            ip = extract_ip(line)
            if ip:
                ip_counter[ip] += 1
    return ip_counter

def save_to_csv(ip_counter, csv_path):
    with open(csv_path, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['ip_address', 'request_count'])
        for ip, count in ip_counter.items():
            writer.writerow([ip, count])

def print_top_ips(ip_counter, top_n=5):
    print("Top {} IPs by request count:".format(top_n))
    for ip, count in ip_counter.most_common(top_n):
        print(f"{ip}: {count}")

if __name__ == "__main__":
    log_file = "access.log"
    csv_file = "ip_request_counts.csv"
    ip_counts = analyze_log(log_file)
    save_to_csv(ip_counts, csv_file)
    print_top_ips(ip_counts)
