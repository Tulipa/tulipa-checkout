﻿jQuery(document).ready(function() {
    var options = {
        onLoad: function() {
            //jQuery('#messages').text('Start typing password');
        },
        onKeyUp: function(evt) {
            jQuery(evt.target).pwstrength("outputErrorList");
        },
		onChange: function(evt) {
            jQuery(evt.target).pwstrength("outputErrorList");
        }
    };
    //jQuery(':password').pwstrength(options);
    jQuery('.inputpass').pwstrength(options);
});
/*jslint vars: false, browser: true, nomen: true, regexp: true */
/*global jQuery */
/*
 * jQuery Password Strength plugin for Twitter Bootstrap
 */
(function(jQuery) {
    "use strict";
    var options = {
            errors: [],
            // Options
            minChar: 6,
            errorMessages: {
                password_to_short: "Sua senha é muito curta!",
                same_as_username: "Não use seu nome na senha!"
            },
            scores: [17, 26, 40, 50],
            verdicts: ["SENHA FRACA", "SENHA NORMAL", "SENHA MÉDIA", "SENHA FORTE", "SENHA MUITO FORTE"],
            showVerdicts: true,
            raisePower: 1.4,
            usernameField: "#newnome",
            onLoad: undefined,
            onKeyUp: undefined,
            viewports: {
                progress: undefined,
                verdict: undefined,
                errors: undefined
            },
            // Rules stuff
            ruleScores: {
                wordNotEmail: -100,
                wordLength: -100,
                wordSimilarToUsername: -100,
                wordLowercase: 1,
                wordUppercase: 3,
                wordOneNumber: 3,
                wordThreeNumbers: 5,
                wordOneSpecialChar: 3,
                wordTwoSpecialChar: 5,
                wordUpperLowerCombo: 2,
                wordLetterNumberCombo: 2,
                wordLetterNumberCharCombo: 2
            },
            rules: {
                wordNotEmail: true,
                wordLength: true,
                wordSimilarToUsername: true,
                wordLowercase: true,
                wordUppercase: true,
                wordOneNumber: true,
                wordThreeNumbers: true,
                wordOneSpecialChar: true,
                wordTwoSpecialChar: true,
                wordUpperLowerCombo: true,
                wordLetterNumberCombo: true,
                wordLetterNumberCharCombo: true
            },
            validationRules: {
                wordNotEmail: function(options, word, score) {
                    return word.match(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i) && score;
                },
                wordLength: function(options, word, score) {
                    var wordlen = word.length,
                        lenScore = Math.pow(wordlen, options.raisePower);
                    if (wordlen < options.minChar) {
                        lenScore = (lenScore + score);
                        options.errors.push(options.errorMessages.password_to_short);
                    }
                    return lenScore;
                },
                wordSimilarToUsername: function(options, word, score) {
                    var username = jQuery(options.usernameField).val();
                    if (username && word.toLowerCase().match(username.toLowerCase())) {
                        options.errors.push(options.errorMessages.same_as_username);
                        return score;
                    }
                    return true;
                },
                wordLowercase: function(options, word, score) {
                    return word.match(/[a-z]/) && score;
                },
                wordUppercase: function(options, word, score) {
                    return word.match(/[A-Z]/) && score;
                },
                wordOneNumber: function(options, word, score) {
                    return word.match(/\d+/) && score;
                },
                wordThreeNumbers: function(options, word, score) {
                    return word.match(/(.*[0-9].*[0-9].*[0-9])/) && score;
                },
                wordOneSpecialChar: function(options, word, score) {
                    return word.match(/.[!,@,#,$,%,\^,&,*,?,_,~]/) && score;
                },
                wordTwoSpecialChar: function(options, word, score) {
                    return word.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/) && score;
                },
                wordUpperLowerCombo: function(options, word, score) {
                    return word.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && score;
                },
                wordLetterNumberCombo: function(options, word, score) {
                    return word.match(/([a-zA-Z])/) && word.match(/([0-9])/) && score;
                },
                wordLetterNumberCharCombo: function(options, word, score) {
                    return word.match(/([a-zA-Z0-9].*[!,@,#,$,%,\^,&,*,?,_,~])|([!,@,#,$,%,\^,&,*,?,_,~].*[a-zA-Z0-9])/) && score;
                }
            }
        },

        setProgressBar = function(el, score) {
            var options = el.data("pwstrength"),
                progressbar = options.progressbar,
                verdict;

            if (options.showVerdicts) {
                if (options.viewports.verdict) {
                    verdict = jQuery(options.viewports.verdict).find(".password-verdict");
                } else {
                    verdict = el.parent().find(".password-verdict");
                    if (verdict.length === 0) {
                        verdict = jQuery('<span class="password-verdict"></span>');
                        verdict.insertAfter(el);
                    }
                }
            }

            if (score < options.scores[0]) {
                progressbar.addClass("progress-danger").removeClass("progress-warning").removeClass("progress-success");
                progressbar.find(".bar").css("width", "5%");
                if (options.showVerdicts) {
                    verdict.text(options.verdicts[0]);
                }
            } else if (score >= options.scores[0] && score < options.scores[1]) {
                progressbar.addClass("progress-danger").removeClass("progress-warning").removeClass("progress-success");
                progressbar.find(".bar").css("width", "25%");
                if (options.showVerdicts) {
                    verdict.text(options.verdicts[1]);
                }
            } else if (score >= options.scores[1] && score < options.scores[2]) {
                progressbar.addClass("progress-warning").removeClass("progress-danger").removeClass("progress-success");
                progressbar.find(".bar").css("width", "50%");
                if (options.showVerdicts) {
                    verdict.text(options.verdicts[2]);
                }
            } else if (score >= options.scores[2] && score < options.scores[3]) {
                progressbar.addClass("progress-warning").removeClass("progress-danger").removeClass("progress-success");
                progressbar.find(".bar").css("width", "75%");
                if (options.showVerdicts) {
                    verdict.text(options.verdicts[3]);
                }
            } else if (score >= options.scores[3]) {
                progressbar.addClass("progress-success").removeClass("progress-warning").removeClass("progress-danger");
                progressbar.find(".bar").css("width", "100%");
                if (options.showVerdicts) {
                    verdict.text(options.verdicts[4]);
                }
            }
        },

        calculateScore = function(el) {
            var self = this,
                word = el.val(),
                totalScore = 0,
                options = el.data("pwstrength");

            jQuery.each(options.rules, function(rule, active) {
                if (active === true) {
                    var score = options.ruleScores[rule],
                        result = options.validationRules[rule](options, word, score);
                    if (result) {
                        totalScore += result;
                    }
                }
            });
            setProgressBar(el, totalScore);
            return totalScore;
        },

        progressWidget = function() {
            return '<div class="progress"><div class="bar"></div></div>';
        },

        methods = {
            init: function(settings) {
                var self = this,
                    allOptions = jQuery.extend(options, settings);

                return this.each(function(idx, el) {
                    var el = jQuery(el),
                        progressbar,
                        verdict;

                    el.data("pwstrength", allOptions);

                    el.on("keyup", function(event) {
                        var options = el.data("pwstrength");
                        options.errors = [];
                        calculateScore.call(self, el);
                        if (jQuery.isFunction(options.onKeyUp)) {
                            options.onKeyUp(event);
                        }
                    });
/* adicionado para funcionar com o gerador de senhas */
					el.on("change", function(event) {
                        var options = el.data("pwstrength");
                        options.errors = [];
                        calculateScore.call(self, el);
                        if (jQuery.isFunction(options.onChange)) {
                            options.onChange(event);
                        }
                    });
/* fim */
                    progressbar = jQuery(progressWidget());
                    if (allOptions.viewports.progress) {
                        jQuery(allOptions.viewports.progress).append(progressbar);
                    } else {
                        progressbar.insertAfter(el);
                    }
                    progressbar.find(".bar").css("width", "0%");
                    el.data("pwstrength").progressbar = progressbar;

                    if (allOptions.showVerdicts) {
                        verdict = jQuery('<span class="password-verdict msgcamponormal">' + allOptions.verdicts[0] + '</span>');
                        if (allOptions.viewports.verdict) {
                            jQuery(allOptions.viewports.verdict).append(verdict);
                        } else {
                            verdict.insertAfter(el);
                        }
                    }

                    if (jQuery.isFunction(allOptions.onLoad)) {
                        allOptions.onLoad();
                    }
                });
            },

            destroy: function() {
                this.each(function(idx, el) {
                    var el = jQuery(el);
                    el.parent().find("span.password-verdict").remove();
                    el.parent().find("div.progress").remove();
                    el.parent().find("ul.error-list").remove();
                    el.removeData("pwstrength");
                });
            },

            forceUpdate: function() {
                var self = this;
                this.each(function(idx, el) {
                    var el = jQuery(el),
                        options = el.data("pwstrength");
                    options.errors = [];
                    calculateScore.call(self, el);
                });
            },

            outputErrorList: function() {
                this.each(function(idx, el) {
                    var output = '<ul class="error-list msgcamponormal">',
                        el = jQuery(el),
                        errors = el.data("pwstrength").errors,
                        viewports = el.data("pwstrength").viewports,
                        verdict;
                    el.parent().find("ul.error-list").remove();

                    if (errors.length > 0) {
                        jQuery.each(errors, function(i, item) {
                            output += '<li>' + item + '</li>';
                        });
                        output += '</ul>';
                        if (viewports.errors) {
                            jQuery(viewports.errors).html(output);
                        } else {
                            output = jQuery(output);
                            verdict = el.parent().find("span.password-verdict");
                            if (verdict.length > 0) {
                                el = verdict;
                            }
                            output.insertAfter(el);
                        }
                    }
                });
            },

            addRule: function(name, method, score, active) {
                this.each(function(idx, el) {
                    var options = jQuery(el).data("pwstrength");
                    options.rules[name] = active;
                    options.ruleScores[name] = score;
                    options.validationRules[name] = method;
                });
            },

            changeScore: function(rule, score) {
                this.each(function(idx, el) {
                    jQuery(el).data("pwstrength").ruleScores[rule] = score;
                });
            },

            ruleActive: function(rule, active) {
                this.each(function(idx, el) {
                    jQuery(el).data("pwstrength").rules[rule] = active;
                });
            }
        };

    jQuery.fn.pwstrength = function(method) {
        var result;
        if (methods[method]) {
            result = methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            result = methods.init.apply(this, arguments);
        } else {
            jQuery.error("Method " + method + " does not exist on jQuery.pwstrength");
        }
        return result;
    };
}(jQuery));