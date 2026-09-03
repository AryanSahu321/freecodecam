import json
import random
from faker import Faker

fake = Faker()


def generate_mock_app_data(num_users=50, num_posts=200):
    # 1. Generate Fake Users
    users = []
    for u_id in range(1, num_users + 1):
        users.append(
            {
                "user_id": u_id,
                "username": fake.user_name(),
                "profile_pic": f"https://picsum.photos/{random.randint(1, 1000)}",
                "bio": fake.sentence(),
            }
        )

    # 2. Generate Fake Posts linked to those Users
    posts = []
    for p_id in range(1, num_posts + 1):
        posts.append(
            {
                "post_id": p_id,
                "user_id": random.randint(1, num_users),
                "image_url": f"https://picsum.photos/{random.randint(1, 1000)}",
                "caption": " ".join(fake.words(nb=5))
                + " #"
                + fake.word(),
            }
        )

    return users, posts


# 1. Generate the data
mock_users, mock_posts = generate_mock_app_data(num_users=50, num_posts=200)

# 2. Save Users to a JSON file
with open("users.json", "w") as f:
    json.dump(mock_users, f, indent=4)

# 3. Save Posts to a JSON file
with open("posts.json", "w") as f:
    json.dump(mock_posts, f, indent=4)

print("Successfully saved data to users.json and posts.json!") 
