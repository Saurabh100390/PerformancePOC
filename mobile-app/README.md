# Performance POC Mobile App

A small React Native/Expo app for mobile performance-testing practice.

## Practice areas

- App launch/startup time
- API response and client-side loading time
- Loading/success/error states
- API refresh and repeated requests
- List rendering and scrolling
- FPS/frame drops/jank observation
- CPU and memory monitoring with Android Studio/Perfetto
- Network traffic inspection

## Windows + Android Emulator

1. Install Node.js LTS and Yarn.
2. Install Android Studio.
3. Install Android SDK Platform, SDK Platform-Tools and Android Emulator.
4. Create a Pixel Android Virtual Device and start it.
5. From this directory run:

~~~powershell
yarn
yarn android
~~~

If the emulator is already running, yarn android launches the app on it.

You can also run:

~~~powershell
yarn start
~~~

Then press a.

## API

The demo calls JSONPlaceholder:
https://jsonplaceholder.typicode.com/posts

For a real performance exercise, replace API_URL in App.tsx with your test API.

## Suggested performance exercises

1. Launch time: cold-start the app several times and measure time to the first usable screen.
2. API latency: compare network/API latency with the time until the UI leaves the loading state.
3. Rendering/FPS: open List / Scroll Test, scroll rapidly and observe frame drops using Android Studio/Perfetto.
4. Resources: repeatedly refresh the API and scroll the list while observing CPU, memory and network usage.
5. Baseline vs change: modify list rendering, repeat the same workload and compare FPS, CPU, memory and response time.

## Structure

- App.tsx - app UI and API test logic
- app.json - Expo/Android configuration
- package.json - Yarn dependencies
- README.md - setup and exercises
