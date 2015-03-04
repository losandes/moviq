/*globals moviqContainer*/
moviqContainer.register({
    name: 'jqVideo',
    dependencies: ['locale', 'IJqVideo', 'jqQuerySelectors', 'eventHandlers', 'jqButtons', 'jqProgressMeter', 'sourceParser', 'sourceManifestParser', 'htmlTemplateGenerator'],
    factory: function (locale, IJqVideo, querySelectorsCtor, eventHandlers, jqButtons, jqProgressMeter, sourceParser, sourceManifestParser, htmlTemplateGenerator) {
        "use strict";
        
        return function ($videoContainer, manifest) {
            var self,
                querySelectors = querySelectorsCtor($videoContainer),
                existingControls = $videoContainer.find(querySelectors.controls.control_container),
                cc,
                btns,
                prog,
                controlsMarkup,
                i;
            
            self = new IJqVideo({
                events: eventHandlers,
                sources: undefined,
                captions: undefined,
                buttons: undefined,
                progress: undefined,
                manifestUrl: undefined,
                $dom: {
                    $handle: $videoContainer,
                    $video: $videoContainer.children('video').first(),
                    $controls: undefined,
                    $header: $videoContainer.children(querySelectors.header).first()
                },
                dom: {
                    handle: $videoContainer[0],
                    video: $videoContainer.children('video').first()[0],
                    controls: undefined,
                    header: $videoContainer.children(querySelectors.header).first()[0]
                }
            });
            
            if (manifest) {
                self.sources = sourceParser.convertSources(manifest.sources);
                self.captions = manifest.captions;
                
                if (self.sources.length > 0) {
                    self.$dom.$video.append(htmlTemplateGenerator.makeSourceMarkup(self.sources));
                }

                if (self.captions.length > 0) {
                    self.$dom.$video.append(htmlTemplateGenerator.makeCaptionMarkup(self.captions));
                }
            } else if (self.dom.video.dataset.manifest) {
                self.manifestUrl = self.dom.video.dataset.manifest;
                self.sources = sourceManifestParser.getSourcesByManifest(self.dom.video.dataset.manifest);
                self.captions = undefined; // TODO
            } else {
                self.sources = sourceParser.getSources(self);
                self.captions = self.dom.video.textTracks;
            }

            cc = self.captions[0];

            if (cc) {
                cc.mode = 'hidden';
            }

            if (existingControls.length < 1) {
                self.$dom.$handle.append(htmlTemplateGenerator.makeControlsMarkup(self.sources));
            }
            
            self.$dom.$controls = $videoContainer.children(querySelectors.controls.control_container).first();
            self.dom.controls = self.$dom.$controls[0];
            
            self.buttons = jqButtons.init(self);
            self.progress = jqProgressMeter.init(self);

            $videoContainer.addClass('moviqified');
            
            return self;
        };
    }
});