import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path"
    
const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      // Specify the folder where you want to save the uploaded files
      callback(null, 'public/images/blogs');
    },
    filename: (req, file, callback) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Get the file extension
        const fileExtension = path.extname(file.originalname);
        // Set the filename to be unique with the original file extension
        callback(null, uniqueName + fileExtension);
    },
});

const upload = multer({ storage : storage });

let blogs = [];

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { blogs : blogs });
});

app.get("/blogs/view/:blogID/", (req, res) => {
    const single = blogs[req.params.blogID];
    res.render("view-blog.ejs", {single : single});
});

app.get("/blogs/create-post", (req, res) => {
    res.render("create-post.ejs");
});

app.post("/create-post/submit", upload.single('image'), (req, res) => {

    req.body.image = req.file.filename;
    blogs.push(req.body);
    
    res.send('Post request received');

});

app.listen(port, ()=> {

    blogs.push({"title": "Embracing Change: A Journey of Growth", "content" : "<p>Change is an inevitable and essential part of life. It challenges us, pushes us out of our comfort zones, and ultimately leads to personal growth. In this short blog, we will explore the transformative power of embracing change and how it can positively impact our lives.</p> <ol><li>The Nature of Change: Change can manifest in various forms, whether it be a career shift, a relationship evolving, or a personal realization. Understanding that change is constant and unavoidable is the first step in navigating its unpredictable course.</li> <li>Challenges as Opportunities: Often, change comes with challenges that might seem daunting at first. However, these challenges are opportunities in disguise, pushing us to develop resilience, problem-solving skills, and adaptability. Embracing change opens the door to new possibilities. </li> <li>Stepping Out of Comfort Zones: Our comfort zones are cozy, but growth rarely happens within them. Embracing change requires us to step into the unknown, to confront uncertainties, and to challenge ourselves. This discomfort is a sign that we are on the path to something new and transformative.</li> <li>Learning from Setbacks: Change may bring setbacks and failures, but these are valuable lessons in disguise. Each setback is an opportunity to learn, adapt, and come back stronger. Resilience is cultivated through facing and overcoming adversity.</li> <li>Self-Discovery: Change often unveils aspects of ourselves that were previously hidden. Whether through new experiences or challenging situations, we have the chance to discover strengths, passions, and capabilities we never knew existed.</li> </ol><p>Cultivating a Positive Mindset: Approaching change with a positive mindset can make all the difference. Instead of fearing the unknown, view it as a canvas waiting to be painted with new experiences and opportunities. A positive attitude can transform challenges into stepping stones toward personal development. Embracing change is not just about adapting to new circumstances; it's about fostering a mindset that sees change as an ally in our journey of personal growth. By acknowledging the inevitability of change and approaching it with a positive attitude, we can turn challenges into opportunities and setbacks into stepping stones. So, let's welcome change, for it is through change that we evolve and become the best versions of ourselves.</p>", "image" : "1.png"}, {"title": "The Power of Gratitude: Transforming Lives One Thank You at a Time", "content" : "In the hustle and bustle of our daily lives, it's easy to overlook the simple yet profound practice of gratitude. This short blog aims to explore the transformative power of gratitude, delving into how incorporating this mindset can positively impact our mental well-being and relationships. Gratitude as a Daily Practice: Cultivating gratitude begins with acknowledging the positive aspects of our lives. Start each day by reflecting on the things you are grateful for, whether it's the support of loved ones, a beautiful sunrise, or the opportunities that lie ahead. Shifting Perspectives: Gratitude has the remarkable ability to shift our perspectives. Instead of focusing on what's lacking or challenging, a grateful mindset helps us appreciate the abundance and goodness present in our lives, no matter how small. Enhancing Mental Well-Being: Numerous studies have shown that practicing gratitude is linked to improved mental health. It reduces stress, enhances emotional resilience, and fosters a more optimistic outlook on life. Taking a moment to express thanks can be a powerful antidote to the pressures of daily life. Building Stronger Connections: Gratitude is not only a personal practice but a social one as well. Expressing appreciation to others strengthens relationships, creating bonds built on positivity and acknowledgment. A simple \"thank you\" can go a long way in fostering a supportive and uplifting environment. Gratitude in Adversity: Embracing gratitude becomes even more impactful during challenging times. While it may be difficult to find silver linings in adversity, the practice of gratitude can help us identify lessons, foster resilience, and navigate hardships with a more hopeful perspective. Creating a Ripple Effect: Gratitude is contagious. When we express our thanks, it inspires a ripple effect, influencing those around us to adopt a more positive outlook. By fostering a culture of gratitude, we contribute to a collective atmosphere of appreciation and kindness. In a world filled with constant challenges and uncertainties, the practice of gratitude stands as a beacon of positivity. By incorporating gratitude into our daily lives, we not only enhance our mental well-being but also contribute to the creation of a more compassionate and interconnected society. So, let's take a moment each day to count our blessings, express our thanks, and experience the transformative power of gratitude.", "image" : "2.png"});

    console.log(`Server started at port ${port}`);
});