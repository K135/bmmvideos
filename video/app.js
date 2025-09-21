// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Video player functionality
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('videoPlayer');
    
    // Ensure video plays on mobile devices
    video.addEventListener('loadedmetadata', function() {
        video.play().catch(function(error) {
            console.log('Auto-play was prevented:', error);
            // If autoplay fails, try to play on user interaction
            document.addEventListener('click', function() {
                video.play();
            }, { once: true });
            
            document.addEventListener('touchstart', function() {
                video.play();
            }, { once: true });
        });
    });
    
    // Handle video errors
    video.addEventListener('error', function(e) {
        console.error('Video error:', e);
    });
    
    // Prevent context menu on video
    video.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Handle fullscreen on mobile
    function enterFullscreen() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    }
    
    // Optional: Double tap to enter fullscreen
    let lastTap = 0;
    video.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 500 && tapLength > 0) {
            enterFullscreen();
        }
        lastTap = currentTime;
    });
});

// PWA Install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Optionally show install button or banner
    console.log('PWA install prompt available');
});

window.addEventListener('appinstalled', (evt) => {
    console.log('PWA was installed');
});