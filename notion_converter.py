import os
import shutil
import datetime

TAG_CONST = "강의 인공지능_및_기계학습"


def create_header(title: str, tag: str) -> str:
    return f"---\ntitle: {title}\ntags: {tag}\nmathjax: true\n---"


def find_files(target_path: str) -> (str, str):
    markdown = ""
    directory = ""

    for file in os.listdir(target_path):
        if os.path.isdir(os.path.join(target_path, file)):
            directory = file
        elif file.split(".")[-1] == "md":
            markdown = file

    return markdown, directory


def find_title(texts: str) -> str:
    title_line = texts.split('\n')[0]
    return title_line.split('#')[-1]


def remove_title(title: str, texts: str) -> str:
    return texts.split(title, 1)[-1]


def change_image_path(dir_name, texts):
    dir_name_in_file = dir_name.replace(' ', '%20')
    new_dir_name = get_new_name(dir_name)
    title = f"https://strutive07.github.io/assets/images/{new_dir_name}"
    return texts.replace(dir_name_in_file, title)


def get_new_markdown_file_name(file_name: str, update_datetime: datetime.datetime) -> str:
    dt_str = update_datetime.strftime('%Y-%m-%d')
    new_name = get_new_file_name(file_name)
    return f"{dt_str}-{new_name}"


def move_dir_and_change_name(dir_path, dir_name, target_path):
    old_dir_path = os.path.join(dir_path, dir_name)
    new_dir_path = os.path.join(dir_path, get_new_name(dir_name))
    os.rename(old_dir_path, new_dir_path)
    try:
        shutil.copytree(new_dir_path, os.path.join(target_path, get_new_name(dir_name)))
    except FileExistsError:
        pass


def get_last_update_date(texts):
    lines = texts.split('\n')
    for line in lines:
        if str.startswith(line, 'last update datetime: '):
            datetime_str = line.split('last update datetime: ')[-1]
            datetime_object = datetime.datetime.strptime(datetime_str, '%b %d, %Y %I:%M %p')
            return datetime_object


def change_file_to_github_pages_format(dir_path: str):
    md_file_name, directory_name = find_files(dir_path)

    with open(os.path.join(dir_path, md_file_name), 'r') as f:
        texts = f.read()
    title = find_title(texts)
    datetime_object = get_last_update_date(texts)
    texts = remove_title(title, texts)
    header = create_header(title, TAG_CONST)
    texts = header + "\n" + texts
    texts = change_image_path(directory_name, texts)
    move_dir_and_change_name(dir_path, directory_name, '/home/wonjun/strutive07.github.io/assets/images')
    md_file_name = get_new_markdown_file_name(md_file_name, datetime_object)
    with open(os.path.join('/home/wonjun/strutive07.github.io/_posts', md_file_name), 'w') as f:
        f.write(texts)

    return texts


def get_new_name(dir_name):
    return dir_name.replace(' ', '_')


def get_new_file_name(file_name):
    new_name = file_name.replace(' ', '.', 1)
    return new_name.replace(' ', '-')

dirs = []
for dir in dirs:
    change_file_to_github_pages_format(dir)
