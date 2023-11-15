# What is this?
This is a collection of scripts to pull minecraft mods from a set of api's given a manifest file.

## Why?
Because all the launchers break every other week and I can't be bothered to switch so I wrote my own scripts.

## Problem?
If you run into any issues whilst trying to use the script or just don't understand what you're doing, feel free to open an issue, I'm happy to help.

# How to use

## Prerequisites
- [Node.js](https://nodejs.org/en)
- NPM (Node Package Manager), comes with Node.js

This project has been tested for Node 19.7.0.
If you are experiencing any issues on other versions, please open an issue on [GitHub](https://github.com/newo-2001/MC-Modpack-Downloader) and I may consider backporting support to older versions of Node.

## Initial setup
If this is your first time running one of the scripts or you have downloaded a newer version, you have to perform some additional setup:
1. Open a terminal in this folder and run the command `npm install`.
2. Copy the file `settings.example.json` and rename it to `settings.json`.
3. Acquire an API key from [the CurseForge website](https://console.curseforge.com/?#/api-keys) after logging in.
4. Replace the `API_KEY_HERE` under the curseforge section with your api key in the `settings.json` file.
    
        ℹ️ Note that this step is still required, even if you don't intend on downloading from CurseForge.
        Other providers might rely on CurseForge behind the scenes.

## Running the scripts
If you are downloading from curseforge:
1. Download the archive for your modpack of choice from the [curseforge website](https://www.curseforge.com/minecraft/search?class=modpacks).
2. Place the `manifest.json` file contained in the archive in the root directory of the project.
3. Open a terminal in the root directory and run the command `npm run curseforge`.
4. Your newly downloaded mods should be located in the output directory (default: `mods`).

If you are downloading from modpacks.ch:
1. Open `settings.json` and change the values in the `modpacks.ch -> modpack` field to the corresponding values found on the [feed-the-beast website](https://www.feed-the-beast.com/).
2. Open a terminal in the root directory and run the command `npm run modpacks.ch`.
3. Your newly downloaded mods should be located in the output directory (default: `mods`).

## Using the downloaded files with MultiMC
1. Create a new instance in MultiMC by click `Add Instance`.
2. Give it an appropriate name and select the correct minecraft version.
3. After the instance is created, click `Edit Instance` and navigate to the `Version` tab.
4. Press `Install Forge` (or Fabric if applicable), you probably want the recommended version.
5. Press the `Open .minecraft` button
6. - If you downloaded the files from CurseForge you want to create a new directory called `mods` and drag the files downloaded by the script in here. Don't forget to manually download any mods that reported having no download url. You will also want to drag the rest of the files that came with the `.zip` besides `manifest.json` into this directory *next to the mods folder*.
   - If you downloaded with modpacks.ch you want to drag all the files downloaded by the script into this directory directly.

## Settings
The `settings.json` file provides several options to customize your experience.
- **Concurrency** - This defines the amount of downloads that will happen at the same time.
    
        ⚠️ Changing this to a high value has the risk of downloads timing out due to exhausting system resources.
- **Output Directory** is the directory in which the downloaded files will be placed. The output directory is relative to this directory.
- **Curseforge** This section contains settings for the `CurseForge` mod provider, these **might** be used by other providers.
    - **Api Key** - CurseForge requires users of their api to provide an api key. You can get yours for free on [their website](https://console.curseforge.com/?#/api-keys) after logging in.
    
            ⚠️ This key is sensative information, you shouldn't post it online.
- **Modpacks.ch** This section contains settings for the `Modpacks.ch` mod provider, these won't be used by other providers.
    - **Modpack** - This block uniquely identifies the modpack you are trying to download. These values can be found on the [ftb website](https://www.feed-the-beast.com/).