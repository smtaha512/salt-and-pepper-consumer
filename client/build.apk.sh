for ARGUMENT in "$@"
do

    KEY=$(echo $ARGUMENT | cut -f1 -d=)
    VALUE=$(echo $ARGUMENT | cut -f2 -d=)   

    case "$KEY" in
            project)              project=${VALUE} ;;
            ngOpts)    ngOpts=${VALUE} ;;     
            *)   
    esac    


done

echo ">> ng build --project=$project $ngOpts" 
#
ng build --project=$project $ngOpts;
cp ./capacitor.config.json ./capacitor.config.temp.json;
echo '>> Do not remove temp file. It will be deleted automatically at the end'
cp ./projects/$project/capacitor.config.json ./capacitor.config.json;
npx cap sync;
cp ./capacitor.config.temp.json ./capacitor.config.json;
rm ./capacitor.config.temp.json;
cp ./projects/$project/android/app/src/main/res/values/strings.xml ./android/app/src/main/res/values/strings.xml
(cd ./android/ && \
 echo '>> Assembling APK' && ./gradlew assembleDebug && \
 echo '>> Removing old APK from device' && adb uninstall com.saltandpapper.$project.app
 echo '>> Installing APK' && ./gradlew installDebug\
);