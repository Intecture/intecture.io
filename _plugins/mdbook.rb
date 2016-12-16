module Mdbook
  class Generator < Jekyll::Generator
    def generate(site)
        Dir.chdir('intecture_book') {
            system("mdbook build ../")
        }
    end
  end
end
