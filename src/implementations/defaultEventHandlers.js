/*globals moviqContainer*/
moviqContainer.register({
    name: 'defaultEventHandlers',
    dependencies: ['locale'],
    factory: function (locale) {
        "use strict";
        
        return function (eventEmitter) {
            var self = {};

            self.onError = function (message) {
                eventEmitter.emit('moviq-error', { message: message });
                throw new Error(message);
            };

            self.onPlay = function (event) {
                eventEmitter.emit('moviq-play', { event: event });
            };

            self.onPause = function (event) {
                eventEmitter.emit('moviq-pause', { event: event });
            };

            self.onShowCaptions = function (event) {
                eventEmitter.emit('moviq-show-captions', { event: event });
            };

            self.onHideCaptions = function (event) {
                eventEmitter.emit('moviq-hide-captions', { event: event });
            };

            self.onToggleSpeed = function (event) {
                eventEmitter.emit('moviq-toggle-speed', { event: event });
            };

            self.onChangeSpeed = function (event, speed) {
                eventEmitter.emit('moviq-change-speed', { speed: speed, event: event });
            };

            self.onToggleQuality = function (event) {
                eventEmitter.emit('moviq-toggle-quality', { event: event });
            };

            self.onChangeQuality = function (quality, event) {
                eventEmitter.emit('moviq-change-quality', { quality: quality, event: event });
            };

            self.onSoundOn = function (event) {
                eventEmitter.emit('moviq-sound-on', { event: event });
            };

            self.onSoundOff = function (event) {
                eventEmitter.emit('moviq-sound-off', { event: event });
            };

            self.onFullscreenOn = function (event) {
                eventEmitter.emit('moviq-fullscreen-on', { event: event });
            };


            self.onFullscreenOff = function (event) {
                eventEmitter.emit('moviq-fullscreen-off', { event: event });
            };

            return self;
        };
    }
});
