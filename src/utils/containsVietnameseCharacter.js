export default function containsVietnameseCharacter(str) {
    // Biểu thức chính quy kiểm tra xem chuỗi có chứa ít nhất một ký tự tiếng Việt không
    const vietnameseRegex = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
    return vietnameseRegex.test(str);
  }
  