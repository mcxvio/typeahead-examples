//http://stackoverflow.com/questions/24560108/typeahead-v0-10-2-bloodhound-working-with-nested-json-objects#24564945
$(document).ready(function() {
    // instantiate the bloodhound suggestion engine
    var engine = new Bloodhound({
        datumTokenizer: function (datum) {
            return Bloodhound.tokenizers.whitespace(datum.title);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
            url: "data/songs.json",
            filter: function (data) {
                return $.map(data.response.songs, function (song) {
                    return {
                        title: song.title,
                        artistName: song.artist_name
                    };
                });
            }
        }
    });

    // initialize the bloodhound suggestion engine
    engine.initialize();

    // instantiate the typeahead UI
    $('#prefetch_songs .typeahead').typeahead(
      {
          hint: true,
          highlight: true,
          minLength: 1
      },
      {
          name: 'engine',
          displayKey: 'title',
          source: engine.ttAdapter(),
          templates: {
              empty: [
              '<div class="empty-message">',
              'unable to find any results that match the current query',
              '</div>'
              ].join('\n')
              //,suggestion: Handlebars.compile('<p><strong>{{title}}</strong> by {{artistName}}</p>')
          }
    });
});