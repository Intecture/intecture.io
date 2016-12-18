module Static
  class Generator < Jekyll::Generator
    def generate(site)
        # Generate book
        `mdbook build intecture_book`

        # Generate Rust docs
        `cargo doc --no-deps --quiet --manifest-path intecture_api/Cargo.toml && rm -rf rust && cp -R intecture_api/target/doc rust`

        # Generate C docs
        Dir.chdir("intecture_api/bindings/c") do
            `doxygen -s`
        end
        `rm -rf c && cp -R intecture_api/bindings/c/c .`

        # Generate PHP docs
        Dir.chdir("intecture_api/bindings/php5") do
            `phpdoc --filename stub.php --target ../../../php5 --template clean`
        end
        Dir.chdir("intecture_api/bindings/php7") do
            `phpdoc --filename stub.php --target ../../../php7 --template clean`
        end
    end
  end
end
