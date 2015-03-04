/*globals moviqContainer, console*/
moviqContainer.register({
    name: 'jqProgressMeter',
    dependencies: ['locale', 'jqQuerySelectors', 'IProgressMeter'],
    factory: function (locale, querySelectorsCtor, IProgressMeter) {
        "use strict";
        
        var init = function (jqVideo) {
            var movi = jqVideo,
                querySelectors = querySelectorsCtor(movi),
                $video,
                video,
                $bar,
                $timeBar,
                $bufferBar,
                $timeDisplay,
                init,
                bindProgressEvents,
                formatTime,
                coverage,
                meters,
                timePickerActive = false;
            
            $video = movi.$dom.$video;
            video = movi.dom.video;
            $bar = querySelectors.controls.getHandle(querySelectors.controls.progress_bar);
            $timeBar = querySelectors.controls.getHandle(querySelectors.controls.progress_time);
            $bufferBar = querySelectors.controls.getHandle(querySelectors.controls.progress_buffer);
            $timeDisplay = querySelectors.controls.getHandle(querySelectors.controls.progress_timeDisplay);

            coverage = {
                getPositionPercent: function () {
                    return (100 * (video.currentTime / video.duration));
                },
                getBufferedPercent: function () {
                    if (video.buffered.length > 0) {
                        return (100 * (video.buffered.end(0) / video.duration));
                    } else {
                        return 0;
                    }
                },
                getAmountConsumed: function () {
                    throw new Error('NOT IMPLEMENTED');
                }
            };

            meters = {
                setPosition: function (pageX) {
                    var percent = meters.getCoordinates(pageX).percent;

                    meters.updateDisplay(percent);
                    video.currentTime = ((video.duration * percent) / 100);
                },
                getCoordinates: function (pageX) {
                    var position = (pageX - $bar.offset().left),
                        percent = ((100 * position) / $bar.width());

                    if (percent > 100) {
                        percent = 100;
                    } else if (percent < 0) {
                        percent = 0;
                    }

                    return {
                        position: position,
                        percent: percent
                    };
                },
                getPosition: function (mousePageX) {
                    var coordinates = meters.getCoordinates(mousePageX),
                        time = (video.duration * (coordinates.percent / 100));

                    return {
                        time: formatTime(time),
                        left: coordinates.position
                    };
                },
                updateDisplay: function (positionPercent) {
                    var newPositionPercent = positionPercent || coverage.getPositionPercent(),
                        bufferedPercent = coverage.getBufferedPercent(),
                        currentTime = formatTime(video.currentTime);

                    if (video.duration > 0) {
                        currentTime += ' / ' + formatTime(video.duration);
                    }

                    $timeBar.css('width', newPositionPercent + '%');
                    $bufferBar.css('width', bufferedPercent + '%');

                    if (!timePickerActive) {
                        $timeDisplay.text(currentTime);
                    }
                }
            };

            formatTime = function (seconds) {
                var m, s;

                m = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
                s = Math.floor(seconds - (m * 60)) < 10 ? "0" + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));

                return m + ":" + s;
            };

            bindProgressEvents = function () {
                var $display = querySelectors.controls.getHandle(querySelectors.controls.progress_timeDisplay),
                    $picker = querySelectors.controls.getHandle(querySelectors.controls.progress_timePicker);

                $video.on('timeupdate', function () {
                    meters.updateDisplay();
                });

                $bar
                    .on('mousedown', function (event) {
                        meters.setPosition(event.pageX);
                    })
                    .on('mouseleave', function (event) {
                        $picker.text('');
                        timePickerActive = false;
                    })
                    .on('mousemove', function (event) {
                        var position = meters.getPosition(event.pageX);

                        timePickerActive = true;
                        $display.text('');
                        $picker.text(position.time);
                        $picker.css('left', position.left);
                    });
            };
            
            // INIT
            bindProgressEvents();
            meters.updateDisplay();
        };
        
        return new IProgressMeter({
            init: init
        });
    }
});