module Static
  class Generator < Jekyll::Generator
    def generate(site)
        `mdbook build intecture_book`
    end
  end
end
