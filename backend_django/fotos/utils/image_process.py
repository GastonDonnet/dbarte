
import io
import os
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
from PIL import ImageCms


def convert_to_srgb(img):
    '''Convert PIL image to sRGB color space (if possible)'''
    icc = img.info.get('icc_profile', '')
    if icc:
        io_handle = io.BytesIO(icc)  # virtual file
        src_profile = ImageCms.ImageCmsProfile(io_handle)
        dst_profile = ImageCms.createProfile('sRGB')
        img = ImageCms.profileToProfile(img, src_profile, dst_profile)
    return img


def reduce_img(img):
    x, y = img.size
    x2 = 750
    y2 = int(y * (x2 / x))

    return img.resize((x2, y2), Image.ANTIALIAS)


def apply_copyright(img, text):
    text_canvas = Image.new('RGBA', img.size, (255, 255, 255, 0))

    # Store image width and height
    w, h = img.size
    print(w, h)

    draw = ImageDraw.Draw(text_canvas)
    #font = ImageFont.load_default()
    font = ImageFont.truetype('Roboto-Regular.ttf', int(0.5 * min(w * 0.1, h * 0.1)))
    text_w, text_h = draw.textsize(text, font)
    pos = ((w - text_w * 0.5) - w * 0.5, (h - text_h*0.5) - h * 0.5)

    draw.text(pos, text, font=font, fill=(255, 255, 255, 90))

    temp_canvas = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    temp_canvas.paste('#000000', (0, 0), text_canvas)

    img.paste(text_canvas, (0, 0), text_canvas)

    return img


def process_image(input_image, text):
    img = Image.open(input_image)
    img = convert_to_srgb(img)
    img = reduce_img(img)
    img = apply_copyright(img, text)

    return img


def process_image2(input_image_path, output_image_path, text):
    img = Image.open(input_image_path)
    img = convert_to_srgb(img)

    # Copy 1
    img = apply_copyright(img, text)

    img = reduce_img(img)
    img.save(output_image_path, optimize=True, quality=95)


# process_image('./NEY_7867_MOD.jpg', './filename_out.jpg',
#               '© www.dbarte.com.ar')
