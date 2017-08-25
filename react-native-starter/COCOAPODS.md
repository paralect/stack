# Init CocoaPods

`cd project-directory/ios`
`pod init`
Open `Podfile` and add required packages.
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
