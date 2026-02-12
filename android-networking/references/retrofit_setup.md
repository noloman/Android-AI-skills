# Retrofit Setup

## Basic Configuration
- Create a single Retrofit instance — shared across all API interfaces.
- Set baseUrl with trailing slash: Retrofit.Builder().baseUrl("https://api.example.com/").
- Use kotlinx.serialization converter: addConverterFactory(json.asConverterFactory(contentType)).
- Or Moshi: addConverterFactory(MoshiConverterFactory.create(moshi)).
- Avoid Gson — reflection-based, slower, less type-safe.

## API Interface
- Define suspend functions for coroutine support.
- @GET, @POST, @PUT, @DELETE, @PATCH for HTTP methods.
- @Path for URL path parameters: @GET("users/{id}").
- @Query for query parameters: @GET("users") suspend fun getUsers(@Query("page") page: Int).
- @Body for request body: @POST("users") suspend fun createUser(@Body user: UserDto).

## Response Handling
- Return Response<T> for access to HTTP status code and headers.
- Return T directly — throws on non-2xx responses (handle with try-catch).
- Use sealed class Result wrapper for clean error propagation.
- Handle HttpException (non-2xx), IOException (network), and SerializationException (parsing).

## Headers
- @Headers("Accept: application/json") for static headers.
- @Header("Authorization") for per-request dynamic headers.
- Prefer OkHttp interceptor for headers that apply to all requests.
- @HeaderMap for multiple dynamic headers.

## Multipart & Streaming
- @Multipart + @Part for file uploads.
- @Streaming on response for large file downloads — read body as stream.
- Use @PartMap for dynamic form fields.
- Set appropriate Content-Type for each part.
