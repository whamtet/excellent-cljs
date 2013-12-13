
(defproject himera "0.1.0-SNAPSHOT"
  :description "ClojureScript compiler service."
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.apache.poi/poi "3.9"]
                 [org.apache.poi/poi-ooxml "3.9"]
                 [ring "1.2.1"]
                 [compojure "1.0.1"]
                 [domina "1.0.1"]
                 [org.clojure/clojurescript "0.0-2014"]
                 ;[org.clojure/clojurescript "0.0-1847"]
                 [com.novemberain/monger "1.5.0"]
                 [iron_mq_clojure "1.0.3"]
                 ]
  :plugins [[lein-cljsbuild "0.3.2"]]
  :dev-dependencies [[jline "0.9.94"]
                     [lein-marginalia "0.7.0-SNAPSHOT"]]
  :cljsbuild {:builds
              [{:source-paths ["src/cljs"],
                :compiler
                {:pretty-print false,
                 :output-dir "resources/public/js/",
                 :output-to "resources/public/js/repl.js",
                 :optimizations :simple},
                :jar true}]}
  :jvm-opts ["-Djava.security.policy=heroku.policy" "-Xmx80M"]
  :source-paths ["src/clj"]
  :main himera.server.app
  :min-lein-version "2.0.0"
  ;;:hooks [leiningen.js]
  )

