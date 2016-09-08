class FBModule {
    constructor() {
        this.FB = null;
        this.targets = [];

        this.subscribe = (target) => {
            if (this.FB) {
                target(FB);
            }
            else {
                this.targets.push(target);
            }
        }

        this.publish = () => {
            this.targets.map(value => {
                value(this.FB)
            });
        }

        if (typeof(window) != 'undefined') {
            var that = this;
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : '1669516483298849',
                    status     : true,
                    cookie     : true,
                    xfbml      : true,
                    version    : 'v2.6'
                });

                that.FB = FB;
                that.publish();
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    }
}

export let fbModule = new FBModule();
