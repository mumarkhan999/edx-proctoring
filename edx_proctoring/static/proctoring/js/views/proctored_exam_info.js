
edx = edx || {};

(function(Backbone, $) {
    'use strict';

    edx.courseware.proctored_exam.ProctoredExamInfo = Backbone.View.extend({
        initialize: function() {
            this.course_id = this.$el.data('course-id');
            this.model.url = this.model.url + '?course_id=' + encodeURIComponent(this.course_id);
            this.tempate_url = '/static/proctoring/templates/proctored-exam-info.underscore';

            this.loadTemplateData();
        },

        updateCss: function() {
            var $el = $(this.el);

            $el.find('.proctoring-info').css({
                padding: '10px',
                border: '1px solid #e7e7e7',
                'border-top': '3px solid #b20610',
                'margin-bottom': '15px'
            });

            $el.find('.onboarding-status').css({
                'font-weight': 'bold',
                'margin-bottom': '15px'
            });

            $el.find('.action').css({
                display: 'block',
                'font-weight': '600',
                'text-align': 'center',
                'text-decoration': 'none',
                padding: '15px 20px',
                border: 'none'
            });

            $el.find('.action-onboarding').css({
                color: '#ffffff',
                background: '#98050e',
                'margin-bottom': '15px'
            });

            $el.find('.action-info-link').css({
                border: '1px solid #0d4e6c'
            });
        },

        render: function() {
            if (this.template) {
                var data = this.model.toJSON()

                // for demo purposes only consider verified or 'none' state 
                $(this.el).html(this.template({
                    onboardingStatus: data.onboarding_status,
                    showOnboardingReminder: data.onboarding_status !== 'verified',
                    showOnboardingLink: !data.onboarding_status,
                    onboardingLink: data.onboarding_link
                }));
            }
        },
        
        loadTemplateData: function() {
            var self = this;
            $.ajax({url: self.tempate_url, dataType: 'html'})
                .done(function(templateData) {
                    self.template = _.template(templateData);
                    self.hydrate();
                });
        },

        hydrate: function() {
            var self = this;
            self.model.fetch({
                success: function() {
                    self.render();
                    self.updateCss();
                }
            });
        }
    })

}).call(this, Backbone, $);