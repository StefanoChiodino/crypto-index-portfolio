ng build --prod
cd dist
git init
git remote add origin git@github.com:StefanoChiodino/crypto-index-diy-github-page.git
git add .
git commit -m "push to github"
git push -f
