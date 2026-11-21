# Aaditya Mandal · Portfolio

A Jekyll portfolio for strategy, analytics, and decision science.

## Local preview

Use Ruby 3.3 and Bundler. Run `bundle install`, then `bundle exec jekyll serve --host 127.0.0.1`. Open [the local site](http://127.0.0.1:4000/).

## Frontend

Jekyll renders the pages, case visuals, and project resource folders. The folders use native HTML disclosure controls. A small TypeScript bundle highlights the current section in the work index and opens the credit dashboard in a keyboard-accessible zoom dialog. The dashboard also has a direct image link.

After editing TypeScript, run `npm ci` and `npm run build:ui`. The build includes the type check and regenerates `assets/js/portfolio-interactions.js`. Commit that output with its source.

## GitHub Pages

The site uses Jekyll at the root of the existing GitHub Pages user repository. Its publishing source is **Deploy from a branch**, **main**, **/(root)**. The branch build serves the prebuilt frontend directly at [aadimandal.github.io](https://aadimandal.github.io/). [GitHub Pages source guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Design and template credits

This portfolio adapts Dean Attali’s [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll) under its [MIT license](LICENSE). Its project disclosures draw on the 21st.dev folder pattern, and the dashboard zoom keeps the existing native dialog implementation. The frontend uses Mona Sans under its [SIL Open Font License](assets/fonts/OFL-mona-sans.txt). [Third-party notices and earlier design credits](THIRD-PARTY-NOTICES.md)
