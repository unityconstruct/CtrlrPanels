jQuery( function( $ ) {

	$( '.bbp-report-link' ).on( 'click' , function( event ) {

		event.preventDefault();

		if ( $( this ).hasClass( 'bbp-report-linked-reported' ) ) {

			return;

		}

		$( this ).siblings( '.bbp-report-type' ).css( 'display', 'inline-block' );

	});

	$( '.bbp-report-select' ).on( 'change', function() {

		bbp_modtools_report_post( $( this ) );

	});

	$( '.bbp-report-link' ).each( function() {

		bbp_modtools_check_reported( $( this ).attr( 'data-post-id' ) );

	});

	/*
	*
	* bbp_modtools_report_post
	* Ajax post to the server when user reports a post
	*
	*/
	function bbp_modtools_report_post( obj ) {

		var post_id = $( obj ).attr( 'data-post-id' );
		var type = $( obj ).val();
		var container = $( obj ).parent();
		var data = {
			action: 'bbp_report_post',
			post_id: post_id,
			type: type,
			nonce: REPORT_POST.nonce,
		}

		$.post( REPORT_POST.ajax_url, data, function( response ) {

			localStorage.setItem( 'bbp_reported_post_' + post_id, 1 );

			$( container ).html( response );
			$( '.bbp-report-link-' + post_id ).text( 'Reported' ).addClass( 'bbp-report-linked-reported' );

		});

	}

	/*
	*
	* bbp_modtools_check_reported
	*
	*/
	function bbp_modtools_check_reported( post_id ) {

		if ( localStorage.getItem( 'bbp_reported_post_' + post_id ) == 1 ) {

			$( '.bbp-report-link-' + post_id ).text( 'Reported' ).addClass( 'bbp-report-linked-reported' );

		}

	}

});
