const { Router } = require ("express");
const router = new Router();
let { fork } = require ("child_process");
let os = require('os');



router.get("/:cant?", async (req, res) => {
	try {
		const { cant = 100000000 } = req.params;

		const forked = fork("./utils/numberRandom.js");

		forked.on("message", (message) => {
			if (message == "ok") {
				forked.send({ cant: cant });
			} else {
				res.json({
					numbers: JSON.stringify(message),
					os: process.platform,
					nodeVersion: process.version,
					rss: JSON.stringify(process.memoryUsage()),
					pid: process.pid,
					projectFolder: process.cwd(),
					Cpus: os.cpus().length,
				});
			}
		});
	} catch (error) {
		res.status(500).json({ error: "Error on messages.", description: error.message });
	}
});

module.exports = router;