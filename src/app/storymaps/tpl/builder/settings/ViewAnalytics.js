define(["lib-build/tpl!./ViewAnalytics",
		"lib-build/css!./ViewAnalytics"
	],
	function (
		viewTpl
	){
		return function ViewAnalytics()
		{
			var	_titleContainer = null,
				_contentContainer = null,
				_settings = null;

			this.init = function(titleContainer, contentContainer)
			{
				_titleContainer = titleContainer;
				_contentContainer = contentContainer;

				_contentContainer.append(viewTpl({
					maptiksTrackcodeLbl: 'Maptiks Trackcode',
					maptiksIDLbl: 'Maptiks ID'
				}));
			};

            this.present = function(settings)
			{
				settings = settings || {};
                _contentContainer.find("#ga-trackcode").prop("value", settings.gaTrackcode);
                _contentContainer.find("#maptiks-trackcode").prop("value", settings.maptiksTrackcode);
                _contentContainer.find("#maptiks-id").prop("value", settings.maptiksId);
				_settings = settings;
			};

			this.show = function()
			{
				//
			};

            this.save = function()
			{
				return {
                    gaTrackcode: _contentContainer.find("#ga-trackcode").prop("value"),
					maptiksTrackcode: _contentContainer.find("#maptiks-trackcode").prop("value"),
                    maptiksId: _contentContainer.find("#maptiks-id").prop("value")
				};
			};

			this.initLocalization = function()
			{
				_titleContainer.html('Analytics');
			};
		};
	}
);
