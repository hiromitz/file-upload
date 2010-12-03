/**
 * File Upload - Plugin for jQuery
 * 
 * file upload plugin for jQuery.
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Depends:
 *   jquery.js
 * 
 * Author: hiromitz ( http://github.com/hiromitz )
 * 
 * TODO:
 * - multiple file upload
 * 
 */
;(function($, undefined) {

// empty function
var fn = function(){};

$.fn.fileUpload = function(op) {
	// default options
	op = $.extend({
		url: 'post.php',
		prefix: 'fileupload-',
		post: fn,
		submit: fn,
		complete: fn,
		label: 'Upload'
	}, op);
	
	return this.each(function() {
		var $el = $(this),
		
			// form
			$form = $('<form>', {
				action: op.url,
				enctype: "multipart/form-data",
				method: 'post',
				target: op.prefix + 'iframe',
				"class": op.prefix + 'form'
			}).appendTo($el),
			
			// file input
			$input = $('<input>', {
				type: 'file',
				name: $el.attr('rel'),
				"class": op.prefix + 'input'
			}).appendTo($form)
			.wrap('<div class="' + op.prefix + 'wrap" />');
		
		$form
		// add submit button
		.append($('<input>', {
			type: 'submit',
			value: op.label,
			"class": op.prefix + 'input'
		}))
		
		// upload action
		.submit(function() {
			op.submit.call($el);
			$iframe = $('<iframe>', {
				name: op.prefix + 'iframe',
				style: 'display: none;'
			})
			.appendTo('body')
			.load(function() {
				$input.val('');
				
				var result = $(this).contents().get(0).body.textContent;
				data = window.eval('(' + result + ')');
				op.complete.call($el, data);
				// kind of hack for firefox
				setTimeout(function() {
					$iframe.remove();
				}, 100);
			});
			
		});
		
		
	});
};

})(jQuery);
