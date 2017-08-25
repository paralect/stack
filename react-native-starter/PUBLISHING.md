# Google Play app publishing

First of all you need to have Google Play Console access and publish your app first time using this service(later you will be able to do it using CI, eg Bitrise).

###### NOTE:
 You should have unique application ``package name``. It can cause changing ``google-service.json`` file (firebase integration) and some other cases. You can read about how to do it [here](https://stackoverflow.com/questions/37389905/change-package-name-for-android-in-react-native).

### Workflow:
1. Create application
2. Fill necessary app info. It marked by alarm icon <br />
![](view/necessary-thing.png)
3. And then you should upload your apk. [This is the best helper for you](https://support.google.com/googleplay/android-developer/answer/7384423?hl=en)
and [this one](https://developer.android.com/studio/publish/app-signing.html) for creating signing files (recommend you to use terminal way not a android studio because you should add secure information into tracked files to do this), you should do 2 of this files and certificates with them as base.
###### NOTE:
once created keystore you can use it to sign both staging and production builds.

4. After you build and sign your first apk choose release type (propose alpha)
![](view/releases.png)
5. Follow prepare to release steps and upload apk
![](view/prepare.png)
6. Complete [signing steps](https://play.google.com/apps/publish/?hl=en&dev_acc=17770726722991848309#KeyManagementPlace:p=com.test.android.app) and get upload key certificate and second keystore
7. If you complete all steps following button will be active<br />
![](view/start.png)
8. That is your trip to publishing app

# App Store publishing

**Prerequisites: Apple account participating in Apple Developer Program and itunes connect account.**
Before publishing to App Store make sure that you have ios provisioning profile created and installed in keychain.
![](view/iOS_Certificates_-_Apple_Developer.png)

Without review you can add only itunes connect users as testers. To start external testing you have to submit build for Beta App Review (requires demo account if sign-in is required for app).

 1. Select your team in Xcode (if it's not available try Download All Profiles in Xcode/Preferences/Accounts)
 2. In Xcode select `Generic iOS Device` and press Product/Archive.
 3. Once your binary is ready you will see it in organizer. Press `Upload To App Store`.
 4. Check entitlements of your build and click Next.
 5. After uploading your build will be processed. You will receive an email when it's ready.
 6. You may see Missing Compliance warning. The build still isn't available for testing, just click an answer on pop-up dialog to share it with testers.
