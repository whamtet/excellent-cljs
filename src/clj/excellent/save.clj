(ns excellent.save)

(defn save [save-text]
  (println "ok" save-text)
  {:status 200
   :headers {"Content-Type" "application/clojure; charset=utf-8"}
   :body save-text})
