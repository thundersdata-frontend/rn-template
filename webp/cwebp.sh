#!/bin/bash 

function ergodic(){  # 函数名
  for file in ` ls $1 `  # for循环
  do  
    if [ -d $1"/"$file ]   # 判断是否为文件夹
    then  # 如果是文件夹
      ergodic $1"/"$file  # 递归该文件夹
    else  
      fullpath=$1"/"$file # 文件的路径以及名字（带后缀）
      path=$(dirname $fullpath) # 文件的路径
      filename=$(basename $fullpath) # 文件的名字（带后缀）
      name=${filename%.*} # 文件的名字（不带后缀）
      extension=${filename##*.} # 文件的后缀
      # 判断文件是否是 .png格式
      if [ "$extension" = "png" ]
      then
        cwebp -q 75 -m 6 $fullpath -o "${path}/${name}.webp"
        rm "$fullpath"
      fi
    fi  
  done  
}  
# INIT_PATH=$(dirname $(pwd))  # 定义路径
# SRC_PATH="$INIT_PATH/src"
# echo "$INIT_PATH"
# echo "$SRC_PATH"

INIT_PATH=$(cd ../src && pwd)
echo "$INIT_PATH"
ergodic $INIT_PATH # 将路径作为参数传入函数中执行