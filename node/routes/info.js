const { Router } = require ("express");
const router = new Router();
const parseArgs = require('minimist');
const args = parseArgs(process.argv.slice(2));
const path = parseArgs(process.argv)._[1];
let os = require('os')

router.get("/", async (req, res) => {
	try {
		res.render("./pages/index", {
			argv: JSON.stringify(args),
			os: process.platform,
			nodeVersion: process.version,
			rss: JSON.stringify(process.memoryUsage()),
			path: path,
			pid: process.pid,
			projectFolder: process.cwd(),
			Cpus: os.cpus().length,
			
		});
	} catch (error) {
		res.status(500).json({ error: "Error while getting messages.", description: error.message });
	}
});

module.exports = router;