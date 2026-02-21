from supabase_client import save_review

result = save_review(
    code="print('hello')",
    review="Use logging instead",
    language="python",
    user_id=None
)

if result:
    print("Test successful! Record data:", result.data)
else:
    print("Test failed. Check your Supabase configuration.")
