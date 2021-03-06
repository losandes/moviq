/*globals Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'jqQuerySelectors',
    dependencies: [],
    factory: function (movi) {
        "use strict";

        return {
            header: '.moviq-header',
            canvas: '.moviq-snapshot',
            hidden: '.moviq-hidden',
            controls: {
                control_container: '.moviq-controls',
                more_controls_container: '.moviq-controls-enclosure-more',
                play: '.moviq-btn-play',
                mute: '.moviq-btn-mute',
                fullscreen: '.moviq-btn-fullscreen',
                cc: '.moviq-btn-cc',
                cc_choice: '.moviq-btn-choose-cc',
                cc_menu: '.moviq-controls-cc',
                speed: '.moviq-btn-speed',
                speed_chooser: '.moviq-speed-chooser',
                speed_current: '.moviq-current-speed',
                speed_back_10: '.moviq-btn-back-10',
                speed_fwd_10: '.moviq-btn-fwd-10',
                choose_speed: '.moviq-btn-choose-speed',
                quality_menu: '.moviq-controls-quality',
                quality: '.moviq-btn-quality',
                quality_choice: '.moviq-btn-choose-quality',
                progress: '.moviq-progress',
                progress_bar: '.moviq-progress-bar',
                progress_buffer: '.moviq-progress-buffer',
                progress_time: '.moviq-progress-time',
                progress_timeDisplay: '.moviq-progress-display',
                progress_timePicker: '.moviq-progress-picker',
                buttons_right: '.moviq-buttons-right',
                controls_left: '.moviq-controls-left',
                controls_right: '.moviq-controls-right',
                subMenus: ['with-speed', 'with-quality', 'with-cc'],
                subMenuButtonClassName: 'moviq-btn-submenu',
                subMenuButton: '.moviq-btn-submenu',
                getHandle: function (buttonHandle) {
                    return movi.$dom.$controls.find(buttonHandle);
                },
                getIconHandle: function (buttonHandle) {
                    return movi.$dom.$controls.find(buttonHandle + ' span');
                }
            }
        };
    }
});
