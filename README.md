# Aaditya Mandal · Portfolio

A Jekyll portfolio for strategy, analytics, and decision science.

## Local preview

Use Ruby 3.3 and Bundler. Run `bundle install`, then `bundle exec jekyll serve --host 127.0.0.1`. Open [the local site](http://127.0.0.1:4000/).

## Frontend

Jekyll renders the pages, case visuals, experience timeline, and project resource folders. The folders use native HTML disclosure controls. TypeScript enhances section indexes, dashboard zoom, and motion. The Liquid Metal shader loads on pointer or keyboard interaction when motion is allowed. The links, figures, and final metric values are available without JavaScript.

After editing TypeScript, run `npm ci` and `npm run build:ui`. The build includes the type check and regenerates the entry script and the separate shader module under `assets/js/`. Commit the output and its accompanying legal notice with the source.

## GitHub Pages

The site uses Jekyll at the root of the existing GitHub Pages user repository. Its publishing source is **Deploy from a branch**, **main**, **/(root)**. The branch build serves the prebuilt frontend directly at [aadimandal.github.io](https://aadimandal.github.io/). [GitHub Pages source guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Design and template credits

This portfolio adapts Dean Attali’s [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll) under its [MIT license](LICENSE). Its action controls use the Liquid Metal Button shader and its project resources use an adaptation of Glassmorphism Folder Cards. Case studies adapt Table of Contents, Zoomable Image, Animated Beam, and Number Ticker. About uses the Experience Timeline pattern. The hero draws on Crimson Reach’s portrait lighting, Brindle informed the desktop work index, and the Electric Scooter template informed the scroll transition. The frontend uses Mona Sans under its [SIL Open Font License](assets/fonts/OFL-mona-sans.txt). [Third-party notices and earlier design credits](THIRD-PARTY-NOTICES.md)
