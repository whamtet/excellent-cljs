 (ns excellent.multipart
  "Parse multipart upload into params."
  (:use [ring.util.codec :only (assoc-conj)])
  (:import [org.apache.commons.fileupload.util Streams]
           [org.apache.commons.fileupload
             UploadContext
             FileItemIterator
             FileItemStream
             FileUpload])
  (:require [ring.util.codec :as codec]))

(defn- parse-params [params encoding]
  (let [params (codec/form-decode params encoding)]
    (if (map? params) params {})))

(defn- multipart-form?
  "Does a request have a multipart form?"
  [request]
  (if-let [^String content-type (:content-type request)]
    (.startsWith content-type "multipart/form-data")))

(defn- request-context
  "Create an UploadContext object from a request map."
  {:tag UploadContext}
  [request encoding]
  (reify UploadContext
    (getContentType [this]       (:content-type request))
    (getContentLength [this]     (or (:content-length request) -1))
    (contentLength [this]        (or (:content-length request) -1))
    (getCharacterEncoding [this] encoding)
    (getInputStream [this]       (:body request))))

(defn- file-item-iterator-seq
  "Create a lazy seq from a FileItemIterator instance."
  [^FileItemIterator it]
  (lazy-seq
    (if (.hasNext it)
      (cons (.next it) (file-item-iterator-seq it)))))

(defn- file-item-seq
  "Create a seq of FileItem instances from a request context."
  [context]
  (file-item-iterator-seq
    (.getItemIterator (FileUpload.) context)))

(defn- parse-file-item
  "Parse a FileItemStream into a key-value pair. If the request is a file the
  supplied store function is used to save it."
  [^FileItemStream item]
  [(.getFieldName item)
   (if (.isFormField item)
     (Streams/asString (.openStream item))
     (slurp (.openStream item))
     #_(store {:filename     (.getName item)
             :content-type (.getContentType item)
             :stream       (.openStream item)}))])

(defn- parse-multipart-params
  "Parse a map of multipart parameters from the request."
  [request encoding]
  (->> (request-context request encoding)
       file-item-seq
       (map parse-file-item)
       (reduce (fn [m [k v]] (assoc-conj m k v)) {})))

(defn multipart-params-request
  "Adds :multipart-params and :params keys to request."
  [request & [opts]]
  (let [;store    (or (:store opts) @default-store)
        encoding (or (:encoding opts)
                     (:character-encoding request)
                     "UTF-8")
        params   (if (multipart-form? request)
                   (parse-multipart-params request encoding)
                   {})

        params (merge params (if-let [query-string (:query-string request)]
                               (parse-params query-string encoding)))
        ]
    (merge-with merge request
                {:multipart-params params}
                {:params params}
                )))

(defn wrap-multipart-params
  "Middleware to parse multipart parameters from a request. Adds the
  following keys to the request map:
    :multipart-params - a map of multipart parameters
    :params           - a merged map of all types of parameter

  This middleware takes an optional configuration map. Recognized keys are:

    :encoding - character encoding to use for multipart parsing. If not
                specified, uses the request character encoding, or \"UTF-8\"
                if no request character encoding is set.

    :store    - a function that stores a file upload. The function should
                expect a map with :filename, content-type and :stream keys,
                and its return value will be used as the value for the
                parameter in the multipart parameter map. The default storage
                function is the temp-file-store."
  [handler & [opts]]
  (fn [request]
    (-> request
        (multipart-params-request opts)
        handler)))
