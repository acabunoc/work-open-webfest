

(function(window, document, undefined){
  var distance = { 0: 0,
                   1: 4,
                   2: 8,
                   3: 12,
                   4: 18,
                   5: 55,
                   6: 59,
                   7: 74,
                   8: 85,
                   9: 92,
                   10: 92 };
      timeline = document.querySelector('.tl'),
      labels =
        { sr: timeline.querySelector('.tl-sr'),
          dr: timeline.querySelector('.tl-dr'),
          credit: timeline.querySelector('.credit'),
          doc: timeline.querySelector('.doc'),
          sharing: timeline.querySelector('.sharing'),
          participation: timeline.querySelector('.participation')
        },
      start = 3,
      progress = timeline.querySelector('.tl-progress');
  labels.credit.classList.add('active');
  function updateLabels(h){
   var labels = timeline.querySelectorAll('.tl-l');
   for(var l in labels){
    if(labels[l].classList) {
      labels[l].classList.remove('active');
    }
   }
   var activeLabels = timeline.querySelectorAll('.page-' + (h-start));
   for(var label in activeLabels){
     var lab = activeLabels[label];
     if(lab.classList) {
       lab.classList.add('active');
       lab.classList.add('past');
     }
   }
  }

  function updateTimeline(h){
    var status = tlStatus(h);
    updateLabels(h);
    timeline.style.display = status.on ? 'block' : 'none';

    for(var key in status.rev) {
      if (status.rev.hasOwnProperty(key)) {
        status.rev[key] ? labels[key].classList.add('active') : labels[key].classList.remove('active');
      }
    }



    progress.style.height = status.distance;
  }

  function tlStatus(h) {
    return { on: (h>=start && h<(start+11)),
             rev: {
              'sr': (h>start && h<(start+5)) ? 'active' : '',
              'dr': (h>(start+4)) ? 'active' : '',
              'credit': (h==(start+2) || h==(start+6)) ? 'active' : '',
              'doc': (h==(start+2) || h==(start+6)) ? 'active' : '',
              'sharing': (h==(start+3) || h==(start+7)) ? 'active' : '',
              'participation': (h==(start+4) || h>=(start+8)) ? 'active' : ''
             },
             distance: distance[h-start] + "%"
           };
  }

  var TimeLine = {
    tlStatus: tlStatus,
    updateTimeline: updateTimeline,
    updateLabels: updateLabels
  };

  window.TimeLine = TimeLine;
  return TimeLine;
})(window, document);

// Full list of configuration options available at:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  controls: false,
  progress: false,
  history: true,
  center: true,

  transition: 'none', // none/fade/slide/convex/concave/zoom

  // Optional reveal.js plugins
  dependencies: [
    { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
    { src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'plugin/highlight/highlight.js', async: true, condition: function() { return !!document.querySelector( 'pre code' ); }, callback: function() { hljs.initHighlightingOnLoad(); } },
    { src: 'plugin/zoom-js/zoom.js', async: true },
    { src: 'plugin/notes/notes.js', async: true }
  ]
});

TimeLine.updateTimeline(Reveal.getIndices().h);

Reveal.addEventListener( 'slidechanged', function( event ) {
  // event.previousSlide, event.currentSlide, event.indexh, event.indexv
  TimeLine.updateTimeline(event.indexh);
} );



