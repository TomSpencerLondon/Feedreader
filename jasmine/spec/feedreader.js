/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    //Suite for RSS Feeds
    describe('RSS Feeds', function() {
        //Ensure all the feeds are defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //Ensure the feeds have valid urls
        it("have filled URLs", function() {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).toMatch(/^(http|https):\/\//);
            });
        });


        //Ensure the feeds have defined names
         it("have defined names and they are not empty", function() {
             allFeeds.forEach((feed) => {
                 expect(feed.name).toBeDefined();
                 expect(feed.name).not.toBe("");
                 expect(feed.name.length).not.toBe(0);
             });
         });
    });


    /* TODO: Write a new test suite named "The menu" */

    describe("The menu", function() {
        //Tests that menu is hidden by default
        it('hides the menu element by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        //Tests show and hide for menu icon
        it('shows and hides the menu icon', function(){
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    describe("Initial Entries", function() {
        //Ensures loadFeed function brings .entry element to .feed container

		beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });    
         });
         
         it('feed container has at least 1 entry', function(done) {
            var entryNumber = $('.feed .entry').length;
            expect(entryNumber).toBeGreaterThan(0);
            done();
         });

	});


    describe("New Feed Selection", function() {
        var compareFeedFirst; 
        var compareFeedSecond;

        beforeEach(function(done) {
            loadFeed(1, function() {
                compareFeedFirst = $('.feed').html();
                loadFeed(2, function() {
                    done(); 
                });
            });
        });

        afterEach(function(done) {
            loadFeed(0);
            done();
        });
        //Tests for correct display after selection from menu
        it('changes the feed content according to the selected element from the menu', function() {
            expect(compareFeedFirst).toBeDefined();
            compareFeedSecond = $('.feed').html();
            expect(compareFeedSecond).toBeDefined();
            expect(compareFeedFirst).not.toEqual(compareFeedSecond);
        });
    });
}());  
