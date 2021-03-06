/*global Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'jqHtmlTemplateGenerator',
    dependencies: ['locale', 'defaultHtmlTemplates', 'IHtmlTemplateGenerator', 'jqQuerySelectors', 'jQuery'],
    factory: function (locale, htmlTemplates, IHtmlTemplateGenerator, querySelectorsCtor, $) {
        "use strict";
        
        var makeControlsMarkup,
            makeSourceMarkup,
            makeCaptionMarkup,
            makeHeaderMarkup,
            makeSnapshotMarkup,
            makeVideoMarkup;
        
        makeControlsMarkup = function (sources, captions) {
            var $markup,
                $qualityMenu,
                $ccMenu,
                querySelectors = querySelectorsCtor(),
                i;
            
            $markup = $(htmlTemplates.controls);
            $qualityMenu = $markup.find(querySelectors.controls.quality_menu);
            $ccMenu = $markup.find(querySelectors.controls.cc_menu);
            
            for (i = 0; i < sources.length; i += 1) {
                $qualityMenu.append(htmlTemplates.qualityButton.replace(/\{0\}/g, sources[i].label));
            }
            
            if (captions) {
                for (i = 0; i < captions.length; i += 1) {
                    $ccMenu.append(htmlTemplates.ccButton
                                   .replace(/\{lang\}/g, captions[i].label)
                                   .replace(/\{id\}/g, i.toString())
                        );
                }
            }
            
            return $markup[0];
        };
        
        makeSourceMarkup = function (iSourceArray) {
            var i,
                markup = '';
            
            for (i = 0; i < iSourceArray.length; i += 1) {
                markup += htmlTemplates.sourceElement
                    .replace(/\{type\}/, iSourceArray[i].type)
                    .replace(/\{label\}/, iSourceArray[i].label)
                    .replace(/\{src\}/, iSourceArray[i].src);
            }
            
            return markup;
        };
        
        makeCaptionMarkup = function (iCaptionArray) {
            var i,
                markup = '';
            
            for (i = 0; i < iCaptionArray.length; i += 1) {
                markup += htmlTemplates.trackElement
                    .replace(/\{label\}/, iCaptionArray[i].label)
                    .replace(/\{srclang\}/, iCaptionArray[i].srclang)
                    .replace(/\{src\}/, iCaptionArray[i].src)
                    .replace(/\{id\}/, i.toString());
            }
            
            return markup;
        };
        
        makeSnapshotMarkup = function () {
            return htmlTemplates.canvas;
        };
        
        makeHeaderMarkup = function (header) {
            return htmlTemplates.header
                    .replace(/\{header\}/, header);
        };
        
        
        makeVideoMarkup = function (poster) {
            if (poster) {
                return htmlTemplates.videoWithPoster
                        .replace(/\{poster\}/, poster);
            } else {
                return htmlTemplates.video;
            }
        };
        
        return new IHtmlTemplateGenerator({
            makeControlsMarkup: makeControlsMarkup,
            makeSourceMarkup: makeSourceMarkup,
            makeCaptionMarkup: makeCaptionMarkup,
            makeHeaderMarkup : makeHeaderMarkup,
            makeSnapshotMarkup: makeSnapshotMarkup,
            makeVideoMarkup: makeVideoMarkup
        });
        
    }
});
