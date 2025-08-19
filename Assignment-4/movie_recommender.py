import csv

def load_movies(filename):
    movies = []
    with open(filename, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Ensure rating is float for sorting
            row['rating'] = float(row['rating'])
            movies.append(row)
    return movies

def recommend_movies(movies, genre, top_n=5):
    # Filter movies by genre (case-insensitive)
    filtered = [m for m in movies if m['genre'].lower() == genre.lower()]
    # Sort by rating descending
    filtered.sort(key=lambda x: x['rating'], reverse=True)
    return filtered[:top_n]

def main():
    filename = 'movies.csv'
    movies = load_movies(filename)
    genre = input("Enter a genre: ")
    recommendations = recommend_movies(movies, genre)
    if recommendations:
        print(f"Top {len(recommendations)} movies in genre '{genre}':")
        for m in recommendations:
            print(f"{m['title']} (Rating: {m['rating']})")
    else:
        print(f"No movies found in genre '{genre}'.")

if __name__ == "__main__":
    main()
