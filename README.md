# Aaditya Mandal · Portfolio

A Jekyll portfolio for strategy and analytics, decision science, and operations analytics.

## Local preview

Use Ruby 3.3 and Bundler. Run `bundle install`, then `bundle exec jekyll serve --host 127.0.0.1`. Open [the local site](http://127.0.0.1:4000/).

## Interactive components

The site loads a prebuilt browser script from `assets/js/`. To rebuild it after editing the components, run `npm ci` and `npm run build:ui`. Jekyll serves the output directly, so branch-based GitHub Pages can publish it.

The component directory is `_frontend/components/ui/` and `@/components/ui` resolves to that directory. Keeping the UI components under that alias lets imports use the same convention as the shadcn registry. Site styles live in `assets/css/portfolio.css` and the bundle type-checks with TypeScript. The metal-glass actions are native links with a shared CSS style. A single shader animates the focused or hovered action when motion and WebGL are available.

For additional components that use Tailwind utilities, run `npm install -D tailwindcss @tailwindcss/cli` and apply the [shadcn manual setup](https://ui.shadcn.com/docs/installation/manual). Create a dedicated Tailwind entry stylesheet for the React layer, and configure `components.json` to use the `@/components/ui` alias and point to that stylesheet. Compile it with `npx @tailwindcss/cli -i _frontend/tailwind.css -o assets/css/components.css --minify` and link it from the Jekyll pages that use it. Use the existing TypeScript configuration for imports. To try the components in a standalone React sandbox, run `npx shadcn@latest init -t vite` in a separate directory. [Vite setup](https://ui.shadcn.com/docs/installation/vite)

## GitHub Pages

The site uses Jekyll in the root of the GitHub Pages user repository. Set the publishing source to **Deploy from a branch**, then select **main** and **/(root)**. The Pages build publishes to [aadimandal.github.io](https://aadimandal.github.io/). See the [Beautiful Jekyll installation guide](https://beautifuljekyll.com/getstarted/) and the [GitHub Pages source guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Design and template credits

The portfolio adapts Dean Attali’s [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll) template under its [MIT license](LICENSE). [Moin’s portfolio](https://mohinuddinabdulrehmanshaikh.github.io/) informed the large name treatment and direct path to selected work. The split copy-and-portrait hero and media-and-summary project rows draw on [21st.dev hero patterns](https://21st.dev/community/components/s/hero) and [media card patterns](https://21st.dev/community/components/s/card). The portfolio implements those patterns in Jekyll HTML and CSS.

The interactive folders and hero link adapt two MIT-licensed 21st.dev components. See [third-party notices](THIRD-PARTY-NOTICES.md) for the component and bundled dependency licenses.

The portfolio uses a deep navy palette, the section index and Mona Sans typography from Brindle by Illos, and a lit portrait panel inspired by Crimson Reach by Kedhareswer Naidu. The portrait and project visuals come from the portfolio. See [third-party notices](THIRD-PARTY-NOTICES.md) and the [Mona Sans font license](assets/fonts/OFL-mona-sans.txt).

The homepage uses a short portrait reveal, scroll-linked movement from the hero into Selected work, and a folder entrance when each project comes into view. The scroll-linked handoff draws on the supplied Electric Scooter template by 8B. The site uses native scrolling and presents a static composition with reduced motion enabled.

The project pages adapt [Zoomable Image](https://21st.dev/@fuma-nama/components/zoomable-image), [Animated Beam](https://21st.dev/@dillionverma/components/animated-beam), and [Number Ticker](https://21st.dev/@dillionverma/components/number-ticker) as native browser interactions. The dashboard can be enlarged in place, the workflow connectors sweep once on entry, and one result per project counts up to its published value. The original image link and all metric values are available without JavaScript.
