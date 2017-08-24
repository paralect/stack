# Push Notifications with Firebase and react-native-fcm

### Installation
1. Create Apple Push Notification Authentication Key for your [Apple developer account](https://developer.apple.com/account)
**NOTE: APN Auth Key can be shared across all apps connected to your developer account so it doesn't need to create a new one if you already have an existing**
To create APN Auth Key login to your account, go to `Certificates, IDs & Profiles`, select `Keys/All` in sidebar menu and create a key.

2. Create an app in [Firebase console](https://console.firebase.google.com/) and download `GoogleService-Info.plist` file.

3. Add Firebase SDK to your app (**NOTE: requires CocoaPods version 1.0.0 or later**):
`cd project-directory/ios`
`pod init`
Open `Podfile` and add following lines to needed target section:
```
  pod 'Firebase/Core', '4.0.0'
  pod 'Firebase/Messaging'
```
`pod install`
***Troubleshooting*** (**NOTE: from now you have to use `projectname.xcworkspace` instead of `projectname.xcodeproj` when opening project in Xcode**):
 - When running pod install you may encounter an error saying that a tvOSTests target is declared twice. This appears to be a bug with pod init and the way that react native is set up.
***Resolution:***
Open your Podfile
Remove the duplicate `tvOSTests` target nested within the main project target
Re-run pod install.
 - When running pod install you may encounter a number of warnings relating to target overrides `OTHER_LDFLAGS`.
***Resolution:***
Open Xcode
Select your project
For each target: -- Select the target -- Click Build settings -- Search for other linker flags -- Add $(inherited) as the top line if it doesn't already exist
Re-run pod install
 - When running pod install you may encounter a warning that a default iOS platform has been assigned. If you wish to specify a different minimum version:
***Resolution:***
Open your Podfile
Uncomment the `# platform :ios, '9.0'` line by removing the # character
Change the version as required

4. Open project in Xcode and add `GoogleService-Info.plist`. It should be placed in the same directory as `Info.plist` file.

5. Select your project **Capabilities** and enable:
  - **Push Notifications**
  - *Background Modes* > **Remote notifications**.
![mobile_xcodeproj](https://user-images.githubusercontent.com/2989199/29454466-019f2dfe-8416-11e7-89ea-4efc9bfc47ba.png)

6. Run:
```
npm install react-native-fcm --save
react-native link react-native-fcm
```

7. Edit `AppDelegate.h`:
```diff
+ @import UserNotifications;
+
+ @interface AppDelegate : UIResponder <UIApplicationDelegate,UNUserNotificationCenterDelegate>
- @interface AppDelegate : UIResponder <UIApplicationDelegate>
```

Edit `AppDelegate.m`:
```diff
+ #import "RNFIRMessaging.h"
  //...

  - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
  {
  //...
+   [FIRApp configure];
+   [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];

    return YES;
 }

+
+ - (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
+ {
+   [RNFIRMessaging willPresentNotification:notification withCompletionHandler:completionHandler];
+ }
+
+ - (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler
+ {
+   [RNFIRMessaging didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
+ }
+
+ //You can skip this method if you don't want to use local notification
+ -(void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
+   [RNFIRMessaging didReceiveLocalNotification:notification];
+ }
+
+ - (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
+   [RNFIRMessaging didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
+ }
```

### Usage
See `README.md` of [react-native-fcm](https://github.com/evollu/react-native-fcm)
On iOS call `requestPermissions` is required (it doesn't need for Android because all needed permissions is listed in app manifest)
**iOS specific Notification Types:**
 - NotificationResponse - fired when user reacts on notification (click or swipe)
 - WillPresent - by default iOS doesn't show notifications if app is in foreground but it can be changed by handle WillPresent: call `finish` with one of parameters:
   - `WillPresentNotificationResult.All` to show notification
   - `WillPresentNotificationResult.None` - default behavior, notification won't be shown
