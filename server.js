// See: https://dev.to/steeve/vuejs-app-on-clevercloud-https-redirection-in-few-minutes-gpf
import 'dotenv/config'
import express from 'express'
import history from 'connect-history-api-fallback'

const app = express()

// Synchronize vuejs history mode
app.use(
    history({
        // Enable logging
        verbose: true
    })
)

// Serve all the files in the '/dist' directory
app.use(express.static("dist"))

app.use(function (req, res, next) {
    if (
        req.secure ||
        req.headers["x-forwarded-proto"] === "https"
    ) {
        return next()
    } else {
        return res.redirect("https://" + req.headers.host + req.url)
    }
})

app.listen(process.env.PORT, "0.0.0.0", function () {
    console.log(`Uropa UI is started on port ${process.env.PORT}`)
})
