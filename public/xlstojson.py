# coding=utf-8

import os
import shutil
# 读excel文件
import xlrd
import json
import lnglat_mercator_tiles_convertor as lnglatconver

testxls = r"./2019-04-02_09-00.xls"

# 获取excel数据源
def get_data(file_path):
    """获取excel数据源"""
    try:
        data = xlrd.open_workbook(file_path)
        data = data.sheets()[0]
        filename = file_path.split('/')[-1].split('.')[0]
        return data,filename
    except Exception as e:
        print ("excel表格读取失败：%s" %e)
        return None

# 将RGB颜色映射到值 灰度化 交通中红色绿色蓝色代表的值不一样权重应该不同
def RGB2Value(R,G,B):
    # 灰度值的加权平均法Gray = 0.299*R + 0.578*G + 0.114*B
    weight = [0.600,0.100,0.300]
    value = weight[0]*R + weight[1]*G + weight[2]*B
    value = round(value,6)
    return value

def xls2json(testxls):
    data,filename = get_data(testxls)
    jsonName = filename+".json"
    row =data.nrows #总行数
    points = []
    for i in range(1,row):
        rowdata =data.row_values(i)#i行的list
        [lng_gcj_02,lat_gcj_02,R,G,B] = rowdata

        (lng_wgs_83,lat_wgs_84) = lnglatconver.gcj02_to_wgs84(lng_gcj_02,lat_gcj_02)
        value = RGB2Value(R,G,B)

        pointdata = [lng_wgs_83,lat_wgs_84,value]
        
        points.append(pointdata)

    jsonData = points

    f = open(jsonName,'w')
    f.truncate()
    f.write('{\"data\":')
    f.write(json.dumps(jsonData))
    f.write('}')
    f.close()
    return jsonName

# 选择文件夹 批量转换xls到json
def batchxls2json():
    rootDirPath = os.getcwd()
    filesInRoot = os.listdir()
    for file in filesInRoot:
        print(filesInRoot.index(file),file) 
    while 1:
        chooseNum = input("please choose a dir to translate:")
        if((os.path.isdir(filesInRoot[int(chooseNum)]) == False)): #or len(filesInRoot[int(chooseNum)]) > 11):
            print("input error")      
        else:
            chooseNum = int(chooseNum)
            jsonFile = filesInRoot[chooseNum]+"-json"
            if(os.path.exists(jsonFile) == False):
                os.mkdir(jsonFile)    
            os.chdir(filesInRoot[chooseNum])
            xlsDataPath = os.getcwd()
            # 用\转义\``
            jsonDataPath = rootDirPath + '\\'  + filesInRoot[chooseNum] + '-json'
            break
    xlsFilesInDir = os.listdir()
    jsonNameList = "jsonNameList.json"
    jsonList = open(jsonNameList,'w')
    jsonList.truncate()
    jsonList.write('{\"namelist\":[')

    for filename in xlsFilesInDir:
        targetJsonName = jsonDataPath + '\\' + filename.split('.')[0] + ".json"
        if(os.path.exists(targetJsonName) == True):
            print(targetJsonName,"is exists")
        else:                
            jsonFile = xls2json(filename)
            shutil.move(jsonFile,jsonDataPath)
            print(jsonFile,"Conversion completed")
        jsonList.write('\"'+jsonFile + '\",')

    jsonList.seek(0,2)                 # end of file
    size=jsonList.tell()               # the size...
    jsonList.truncate(size-1)          # truncate at that size - how ever many characters
    jsonList.write(']}')
    jsonList.close()
    shutil.move(jsonNameList,rootDirPath) 

batchxls2json()











