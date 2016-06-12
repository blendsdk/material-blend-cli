ls -d ../temp/*/ | wc -l | xargs -I {} ./make-cli.sh init -d ../temp/app{}
