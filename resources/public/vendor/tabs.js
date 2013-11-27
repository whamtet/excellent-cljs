$(function() {
    window.total_tabs = 0;

    // initialize first tab
    total_tabs++;
    addtab(total_tabs);

    $("#addtab, #litab").click(function() {
        total_tabs++;
        $("#tabcontent textarea").hide();
        addtab(total_tabs);
        return false;
    });

    function addtab(count) {
        var closetab = '<a href="" id="close'+count+'" class="close">&times;</a>';
        $("#tabul").append('<li id="t'+count+'" class="ntabs">Tab '+count+'&nbsp;&nbsp;'+closetab+'</li>');
      //$("#tabcontent").append('<textarea id="c'+count+'" style="width: 100%;" ></textarea>');
      $("#tabcontent").append('<textarea id="workspace'+count+'" style="width: 100%;" rows="40"></textarea>');
      excellent.io.open_tab(count)

        $("#tabul li").removeClass("ctab");
        $("#t"+count).addClass("ctab");

        $("#t"+count).bind("click", function() {
            $("#tabul li").removeClass("ctab");
            $("#t"+count).addClass("ctab");
            $("#tabcontent textarea").hide();
            $("#workspace"+count).fadeIn('fast');
        });

        $("#close"+count).bind("click", function() {
            excellent.io.close_tab(count)
            // activate the previous tab
            $("#tabul li").removeClass("ctab");
            $("#tabcontent textarea").hide();
            $(this).parent().prev().addClass("ctab");
            $("#workspace"+count).prev().fadeIn('fast');

            $(this).parent().remove();
            $("#workspace"+count).remove();
            return false;
        });
    }
    window.addtab = addtab
    addtabs()
});
